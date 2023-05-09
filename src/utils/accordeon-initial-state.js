const AccordeonInitialState = () => {
  const accordAll = document.querySelectorAll(".show");
  const accordFirst = document.querySelector(".accordion-collapse");
  accordAll.forEach((acc) => {
    acc.classList.remove("show");
  });
  accordFirst.classList.add("show");

  const collapseAll = document.querySelectorAll(".accordion-button");
  collapseAll.forEach((acc) => {
    acc.classList.add("collapsed");
  });
  
};

export default AccordeonInitialState;
