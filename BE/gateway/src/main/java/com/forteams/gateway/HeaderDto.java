package com.forteams.gateway;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HeaderDto {
    private String msUuid;
    private String userNickname;
    private String dept;
}
