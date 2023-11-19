import { selectedData as selectDataAction } from 'modules/fanLetter';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Select = () => {
  const fanLatter = useSelector(state => state.fanLetter);
  const dispatch = useDispatch();

  const handleSelectChange = e => {
    const selectedName = e.target.value;
    const selectedData = fanLatter.data.find(item => item.name === selectedName);
    console.log('selectedData: ', selectedData);

    dispatch(selectDataAction(selectedData));
  };

  useEffect(() => {
    if (fanLatter.data.length) dispatch(selectDataAction(fanLatter.data[0]));
  }, [fanLatter.data, dispatch]);

  return (
    <>
      <p style={{ marginBottom: '20px' }}>보낼 사람 선택</p>
      <select value={fanLatter.selectedData ? fanLatter.selectedData.name : ''} onChange={handleSelectChange}>
        {fanLatter.data.map(item => {
          return <option key={item.id}>{item.name}</option>;
        })}
      </select>
    </>
  );
};

export default React.memo(Select);
