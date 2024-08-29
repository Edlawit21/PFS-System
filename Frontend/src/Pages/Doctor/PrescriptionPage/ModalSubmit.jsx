import { Divider } from "antd";

const ModalSubmit = () => (
  <div>
    <h1 className="pt-6 flex justify-center">Prescription Form</h1>
    <Divider style={{ borderColor: "#e0e0e0", borderWidth: "1px" }} />
    <div>
      <div className="flex justify-between mx-24">
        <h4>Prescription No.</h4>
        <h4>Prescription Date :</h4>
      </div>
      <h2 className="mx-24">Patient Information</h2>
      <hr className="mt-3 mb-4 mx-20" />
      <div className="mx-24 flex justify-between">
        <span>
          <h4>Name</h4>
          <h4>Gender</h4>
          <h4>Allergies</h4>
        </span>
        <span>
          <h4>Age</h4>
          <h4>Phone Number</h4>
          <h4>Notable Health Condition</h4>
        </span>
      </div>
      <div className="mx-24">
        <h4>List of Prescribed Medication</h4>
      </div>
      <div className="mx-24 flex justify-between">
        <span>
          <h4>Physician Name</h4>
          <h4>Physician Signature</h4>
        </span>
        <span>
          <h4>Physician Phone Number</h4>
        </span>
      </div>
      <hr className="mt-3 mb-4 mx-20" />
    </div>
  </div>
);

export default ModalSubmit;
