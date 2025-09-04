package com.group2.moffat_bay.util;

import com.group2.moffat_bay.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    /**
     * Base64-encoded HMAC secret (at least 256 bits when decoded).
     * e.g. generate with: openssl rand -base64 48
     */
    @Value("${security.jwt.secret-base64}")
    private String secretBase64;

    /**
     * Expiration millis (default 10 hours if not set).
     */
    @Value("${security.jwt.expiration-ms:36000000}")
    private long expirationMs;

    private Key key;

    @PostConstruct
    public void init() {
        byte[] secretBytes = Base64.getDecoder().decode(secretBase64);
        this.key = Keys.hmacShaKeyFor(secretBytes);
    }

    /**
     * Generate a JWT with subject = user's email, and some handy claims.
     */
    public String generateToken(User user) {
        Instant now = Instant.now();
        Instant exp = now.plusMillis(expirationMs);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(exp))
                .addClaims(Map.of(
                        "uid", user.getUserId(),
                        "admin", Boolean.TRUE.equals(user.getIsAdmin())
                ))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Validate token signature & expiration.
     */
    public boolean validateToken(String token) {
        try {
            parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /**
     * Extract subject (we store user's email as subject).
     */
    public String extractSubject(String token) {
        try {
            return parseClaimsJws(token).getBody().getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }

    /**
     * Extract arbitrary claim (helper).
     */
    public Object extractClaim(String token, String claimKey) {
        try {
            return parseClaimsJws(token).getBody().get(claimKey);
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }

    /**
     * Read \"Authorization: Bearer <token>\" from request.
     */
    public String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header == null || header.isBlank()) return null;
        if (!header.startsWith("Bearer ")) return null;
        String token = header.substring(7).trim();
        return token.isEmpty() ? null : token;
    }

    /**
     * Validate token directly from request header.
     */
    public boolean validateTokenFromHeader(HttpServletRequest request) {
        String token = extractToken(request);
        return token != null && validateToken(token);
    }

    /**
     * Guard method: throw 401 if token missing/invalid.
     * Use this at the start of protected controller methods (until you add a JWT filter).
     */
    public void requireValidToken(HttpServletRequest request) {
        if (!validateTokenFromHeader(request)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token not valid");
        }
    }

    /**
     * Convenience: get the email (subject) from the current request's token.
     */
    public String extractEmailFromRequest(HttpServletRequest request) {
        String token = extractToken(request);
        return token == null ? null : extractSubject(token);
    }

    // ---- internal helpers ----
    private Jws<Claims> parseClaimsJws(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }
}
