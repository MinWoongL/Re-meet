package com.example.remeet.service;

import com.example.remeet.dto.VideoDataDto;
import com.example.remeet.dto.VoiceDataDto;
import com.example.remeet.repository.ModelBoardRepository;
import com.example.remeet.repository.ProducedVideoRepository;
import com.example.remeet.repository.ProducedVoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {
    private final ProducedVideoRepository producedVideoRepository;
    private final ProducedVoiceRepository producedVoiceRepository;

    public List<VideoDataDto> recentProducedVideo(Integer userNo) {
        List<VideoDataDto> recentVideo = producedVideoRepository.findTopVideosByUserNo(userNo, PageRequest.of(0, 10));
        List<VideoDataDto> recentVoice = producedVoiceRepository.findTopVoicesByUserNo(userNo, PageRequest.of(0, 10));
        recentVideo.addAll(recentVoice);
        return recentVideo;
    }

    public List<VideoDataDto> allProducedVideoByModel(Integer modelNo) {
        List<VideoDataDto> recentVideo = producedVideoRepository.findProducedVideoByModelNo(modelNo);
        List<VideoDataDto> recentVoice = producedVoiceRepository.findProducedVoiceByModelNo(modelNo);
        recentVideo.addAll(recentVoice);
        return recentVideo;
    }

    public Boolean checkProducedVideo(Integer proVideoNo){
        return producedVideoRepository.findByProVideoNo(proVideoNo).isPresent();
    }

    public Boolean deleteProducedVideo(Integer userNo, Integer proVideoNo) {
        Integer videoUserNo = producedVideoRepository.findByProVideoNo(proVideoNo).get().getModelNo().getUserNo().getUserNo();
        if (videoUserNo.equals(userNo)) {
            producedVideoRepository.deleteById(proVideoNo);
            return true;
        } else {
            return false;
        }
    }
}
