import { useNavigate } from 'react-router-dom';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const Wrapper = styled.div`
  width: 86vw;
  height: 4.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Imgbox = styled.div<{ $imagePath: string }>`
  margin: auto 0;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 8px;
  background-color: #f6f6f6;
  background-image: url(${(props) => props.$imagePath});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

const ContentWrapper = styled.div`
  width: 69vw;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
`;

const NameBox = styled.div`
  height: 1.25rem;
  font-weight: 600;
`;

const ConversationButton = styled.button`
  width: 4.25rem;
  height: 2rem;
  border-radius: 100px;
  border: 0;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: var(--primary-color);
  color: #fff;

  &:hover {
    color: var(--primary-color);
    background-color: #f6f6f6;
    border: 0.5px solid var(--primary-color);
  }
`;

interface BoardItemProps {
  modelNo: number;
  modelName: string;
  imagePath: string;
  eleVoiceId?: string;
  heyVoiceId?: string;
}

const BoardItem = ({
  modelNo,
  modelName,
  imagePath,
  eleVoiceId,
  heyVoiceId,
}: BoardItemProps) => {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const handleGoModelInfo = () => {
    navigate(`${modelNo}`);
  };
  const handleGoTalk = (e: MouseEvent) => {
    e.stopPropagation();
    if (eleVoiceId && heyVoiceId) {
      MySwal.fire({
        title: '대화 종류를 선택해 주세요.',
        icon: 'question',
        showConfirmButton: true,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '음성 대화',
        denyButtonText: '영상 대화',
      })
        .then((result) => {
          if (result.isConfirmed) {
            navigate(`/talk/voice/${modelNo}`);
          }
          if (result.isDenied) {
            navigate(`/talk/video/${modelNo}`);
          }
        })
        .catch(() => {});
    } else {
      navigate(`/producing/${modelNo}`);
    }
  };
  return (
    <Wrapper onClick={handleGoModelInfo}>
      <Imgbox $imagePath={imagePath} />
      <ContentWrapper>
        <NameBox>{modelName}</NameBox>
        <ConversationButton onClick={handleGoTalk}>대화</ConversationButton>
      </ContentWrapper>
    </Wrapper>
  );
};

export default BoardItem;
