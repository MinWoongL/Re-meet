package com.example.remeet.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Data
@Entity
@Builder
@DynamicInsert
@Table(name = "UPLOADED_VOICE")
public class UploadedVoiceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="voice_no")
    private Integer voiceNo;

    @NotNull
    @Column(name="voice_path")
    private String voicePath;

    @NotNull
    @ManyToOne
    @Column(name="model_no")
    private ModelBoardEntity modelNo;


}