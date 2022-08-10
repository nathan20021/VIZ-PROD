import React from 'react' 

const ServiceNode = ({ inputs, data }) => {
    return (
      <div className="rounded-md w-10 h-10 z-10">
        <div className=" h-auto w-full select-none pointer-events-none -z-20">
          <img
            src={`${data.nodeType}.jpg`}
            alt={data.nodeType}
            className="select-none pointer-events-none"
          ></img>
        </div>
        {/* <div className="mt-1">
          {inputs.map((port) =>
            React.cloneElement(port, {
              style: { width: "50px", height: "25px", background: "#1B263B" },
            })
          )}
        </div> */}
      </div>
    );
  };  

export default ServiceNode;