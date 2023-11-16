import { selectedData } from 'modules/fanLetter';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Select = () => {
  const fanLatter = useSelector(state => state.fanLetter);
  const dispatch = useDispatch();

  // const selectedData = useSelector(state => state.select.data);
  // const { selectedOption, setSelectedOption } = useContext(SelectedContext);

  const handleSelectChange = e => {
    const selectedName = e.target.value;
    const selectedData = fanLatter.data.find(item => item.name === selectedName);

    if (selectedName === '') return alert('이름을 선택해 주세요.');

    // setSelectedOption(selectedData);
    dispatch(selectedData(selectedData));
  };

  useEffect(() => {
    if (fanLatter.data.length) dispatch(selectedData(fanLatter.data[0]));
  }, [fanLatter.data, dispatch]);

  return (
    <>
      보낼 사람 선택 :
      <select value={fanLatter.selectedData ? fanLatter.selectedData.name : ''} onChange={handleSelectChange}>
        {fanLatter.data.map(item => {
          return <option key={item.id}>{item.name}</option>;
        })}
      </select>
    </>
  );
};

export default React.memo(Select);
