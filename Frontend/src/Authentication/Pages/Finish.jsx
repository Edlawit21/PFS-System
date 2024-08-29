import check from "../../Assets/check.png";

const Finish = () => {
  return (
    <div className="text-center mx-8">
      <div className="flex justify-center mb-4 mt-6">
        <img src={check} alt="Check" className="w-24 h-24" />{" "}
      </div>
      <h1>Thank You!</h1>
      <div>
        Your registration has been successfully submitted. Our team will review
        it and send a confirmation email once approved. If you ever need
        support, please feel free to email us at support@gmail.com
      </div>
      <h4 className="mt-4">Thank you for your patience!</h4>
    </div>
  );
};

export default Finish;
