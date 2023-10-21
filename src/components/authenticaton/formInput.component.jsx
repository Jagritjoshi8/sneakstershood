const FormInput = ({ label, ...otherprops }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input {...otherprops} />
    </div>
  );
};

export default FormInput;
