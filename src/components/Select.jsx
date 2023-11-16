import { CommonContext } from 'context/CommonContext';
import { SelectedContext } from 'context/SelectedContext';
import React, { useContext, useEffect } from 'react';

const Select = () => {
  const data = useContext(CommonContext);
  const { selectedOption, setSelectedOption } = useContext(SelectedContext);

  // 셀렉트 박스 감지
  const handleSelectChange = e => {
    const selectedName = e.target.value;
    console.log('selectedName: ', selectedName);
    const selectedData = data.find(item => item.name === selectedName);

    if (selectedName === '') return alert('이름을 선택해 주세요.');

    setSelectedOption(selectedData);
  };

  useEffect(() => {
    setSelectedOption(data[0]);
  }, [data, setSelectedOption]);

  return (
    <>
      보낼 사람 선택 :
      <select value={selectedOption ? selectedOption.name : ''} onChange={handleSelectChange}>
        {data.map(item => {
          return <option key={item.id}>{item.name}</option>;
        })}
      </select>
    </>
  );
};

export default React.memo(Select);
