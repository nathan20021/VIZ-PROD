import React from 'react';

const ServiceComponent = ({quantumnSize}) => (
    <div className="select-none cursor-pointer w-full h-full">
      <div style={{ width: quantumnSize * 2, height: quantumnSize * 2 }}>
        <img
          src={process.env.PUBLIC_URL + `aws-asset/Compute/Amazon-EC2.png`}
          draggable="false"
          alt=""
        />
      </div>
    </div>
  );

export default ServiceComponent;