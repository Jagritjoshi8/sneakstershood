import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(255, 206, 247, 0.76)",
    color: "red",
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}));
const UserFormInput = ({ label, title, ...otherprops }) => {
  return (
    <div className="form-group">
      <div>
        <label>{label}:</label>
      </div>
      <div className="input-info-container">
        <input {...otherprops} />
        <LightTooltip title={title} arrow placement="top-start">
          <InfoOutlinedIcon className="info-icon" />
        </LightTooltip>
      </div>
    </div>
  );
};

export default UserFormInput;
