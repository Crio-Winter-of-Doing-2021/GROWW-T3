import React from 'react';

const dropdown = (props) =>
{

    //console.log(props);

    const selectedVal = props.selectedValue;
    return(
        <div>
        <select id = {props.id} className = "form-select w-50 mt-3" onClick={props.onClickHandler}>
            {
                props.options.map(i => {
                  return <option value={i} selected = {selectedVal === i}>{i}</option>
                })
            }
        </select>
            <span>Eval condition: {props.evalCond}</span>
        </div>
    );


}

export default dropdown;