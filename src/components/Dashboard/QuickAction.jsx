import React from "react";
import { ArrowRight } from "lucide-react";

const QuickAction = ({ label, onClick }) => {
  return (
    <button className="quick-action" onClick={onClick}>
      <span>{label}</span>
      <ArrowRight size={20} />
    </button>
  );
};

export default QuickAction;
