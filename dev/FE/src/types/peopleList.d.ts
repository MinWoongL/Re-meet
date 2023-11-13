interface PeopleListItem {
  modelNo: number;
  modelName: string;
  imagePath: string;
}

interface VoiceList {
  voiceNo: number;
  voicePath: string;
}

interface VideoList {
  videoNo: number;
  videoPath: string;
}

interface ModelInformation extends PeopleListItem {
  videoList: VideoList[];
  voiceList: VoiceList[];
  conversationText: { [key: string]: string }[];
  conversationText2: string;
  eleVoiceId?: string;
  avatarId: string;
}

export { PeopleListItem, ModelInformation, VoiceList, VideoList };
