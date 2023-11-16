import styled from 'styled-components';

export const FORM_WARPPER = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
export const Form = styled.div`
  height: 210px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #000000;
  padding: 20px;
`;
export const TEXT_BOX = styled.div`
  display: flex;
`;
export const Label = styled.label`
  width: 100px;
  display: flex;
  align-items: center;
`;
export const Input = styled.input`
  width: 100%;
`;
export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 80px;
`;
export const UpdateTextArea = styled.textarea`
  resize: none;
  width: 350px;
  height: 40px;
`;

// 버튼
export const ButtonWrap = styled.div`
  width: 100%;
  overflow: hidden;
`;
export const Button = styled.button`
  float: right;
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border-radius: 6px;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px 0px;
  font-weight: 800;
  font-size: 16px;
  height: 36px;
  margin-left: 10px;
  border: 2px solid ${props => props.border};
  color: #fff;
  background-color: ${props => props.backcolor};

  &:hover {
    background: 0 0;
    color: ${props => props.color};
  }
`;
// 댓글 뿌리는 영역
export const COMMENT_WARP = styled.div``;

export const UserIcon = styled.img`
  width: 100px;
  float: left;
`;
export const LiLabel = styled.label`
  display: flex;
  gap: 5px;
  flex-direction: column;
  margin: 10px;
`;
export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  color: black;
  justify-content: center;
`;
export const Li = styled.li`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 160px;
  color: black;
  border: 2px solid black;
  cursor: pointer;
  border-radius: 15px;
  padding: 10px;
  background: white;
`;

export const AddTextArea = styled.textarea`
  width: 350px;
  height: 40px;

  &:disabled {
    background-color: #f2f2f2;
    color: #777;
    cursor: not-allowed;
    border: 1px solid #ccc;
    box-shadow: none;
    outline: none;
  }
`;
