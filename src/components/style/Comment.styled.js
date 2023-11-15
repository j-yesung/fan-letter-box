import styled from 'styled-components';

export const Form = styled.div`
  height: 210px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #000000;
  padding: 20px;
`;
export const WriteBox = styled.div`
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
// ----------------------
// 댓글 뿌리는 영역
export const UserIcon = styled.img`
  top: 30px;
  width: 100px;
  height: 100px;
  margin-right: 10px;
`;
export const LiLabel = styled.label`
  display: flex;
  gap: 5px;
  flex-direction: column;
  position: relative;
  left: 120px;
  bottom: 93px;
`;
export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 500px;
  color: #000000;
  justify-content: center;
`;
export const Li = styled.li`
  height: 125px;
  color: white;
  border: 2px solid black;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px;
  background: #5e5e5e;
`;
export const AddButtonWrap = styled.div`
  overflow: hidden;
`;
export const AddButton = styled.button`
  float: right;
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid #42adff;
  color: #fff;
  background-color: #42adff;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px 0px;
  font-weight: 800;
  font-size: 16px;
  height: 36px;

  &:hover {
    background: 0 0;
    color: #42adff;
  }
`;
export const UpdateButtonWrap = styled.div`
  overflow: hidden;
  margin-top: 10px;
`;
export const DeleteButton = styled.button`
  float: right;
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid #ff4742;
  color: #fff;
  background-color: #ff4742;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px 0px;
  font-weight: 800;
  font-size: 16px;
  height: 36px;

  &:hover {
    background: 0 0;
    color: #ff4742;
  }
`;
export const EditButton = styled.button`
  float: right;
  margin-right: 5px;
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid #49da59;
  color: #fff;
  background-color: #49da59;
  padding: 8px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 4px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1.5px 0px;
  font-weight: 800;
  font-size: 16px;
  height: 36px;

  &:hover {
    background: 0 0;
    color: #49da59;
  }
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
