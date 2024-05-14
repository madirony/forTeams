package com.forteams.auth.filter;

import com.forteams.auth.entity.MsUserEntity;
import com.forteams.auth.entity.UserEntity;
import com.forteams.auth.provider.JwtProvider;
import com.forteams.auth.repository.MsUserRepository;
import com.forteams.auth.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 리퀘스트 객체에서 brearerToken형태로 인증 정보 받아옴.
 * brearerToken에 있는 token값을 꺼내 옴.
 * 그 값을 JwtProvider에서 만든 validate()에서 적절한 토큰인지 검사.
 * subject에서 값을 꺼내서, 그걸로 작업 진행.
 */

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;
    private final MsUserRepository msUserRepository;
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {

            String token = parseBearerToken(request);
            if(token == null) {
                filterChain.doFilter(request, response); //다음 필터로 넘김
                return;
            }

            String msUuid = jwtProvider.findUuidFromJwt(token);
            if (msUuid == null) {
                filterChain.doFilter(request, response);
                return;
            }

            MsUserEntity msUserEntity = msUserRepository.findByMsUuid(msUuid);
            UserEntity userEntity = userRepository.findByMsUserEntity_MsUuid(msUserEntity.getMsUuid());
            if (userEntity == null) return;
//                    .orElseThrow(() -> new IllegalArgumentException("User entity not found")); //msUserEntity와 join해서 값 가져오기
            String userRole = userEntity.getUserRole(); //role: ROLE_USER, ROLE_ADMIN

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(userRole));

            // 컨테이너로 이동시킬 컨텍스트 비어있는 컨텍스트 생성 (이 안에 토큰 넣기)
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();

            AbstractAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(msUuid, null, authorities);
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            securityContext.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(securityContext);

        } catch (Exception e) {
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);

    }

    // 리퀘스트에서 bearer Token 값 꺼내는 작업
    private String parseBearerToken(HttpServletRequest request) {

        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return  null;

        //Jwt토큰은 bearer 인증 방식임. bearer 인증 방식이 아닐 땐 null 반환
        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer) return null;

        String token = authorization.substring(7); //"Bearer " 다음부터 값 가져옴
        return token;

    }
}
