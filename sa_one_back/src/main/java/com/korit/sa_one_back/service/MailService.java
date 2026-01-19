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

    public void sendPasswordResetMail(String toEmail, String resetLink) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(toEmail);
        msg.setSubject("[SA:ONE] 비밀번호 재설정 안내");
        msg.setText(
                "비밀번호 재설정을 요청하셨습니다.\n\n" +
                "아래 링크에서 새 비밀번호를 설정해 주세요. \n" +
                "본 링크는 30분 후에 만료됩니다. \n" +
                resetLink + "\n\n" +
                "본인이 요청하지 않으셨다면 무시하세요."
        );
        mailSender.send(msg);
    }
}
