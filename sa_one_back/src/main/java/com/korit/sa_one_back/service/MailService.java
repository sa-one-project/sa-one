package com.korit.sa_one_back.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    public void sendMarkedUsername(String toEmail, String maskedUsername) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(toEmail);
        msg.setSubject("[SA:ONE] 아이디 찾기 안내");
        msg.setText(
                "요청하신 아이디는 다음과 같습니다."
                + maskedUsername + "\n\n" +
                "본인이 요청하지 않으셨다면 무시하세요."
        );
        mailSender.send(msg);
    }
}
