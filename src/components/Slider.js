import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const itemsArray = [
	{
		imgUrl: require("../assets/images/khaneyema-991209-1.jpg"),
		link: "https://khaneyema.tv/7001/",
		title: "مدیریت خرج ‌و مخارج زندگی، روش ها و گام ها",
		isSelected: true,
	},
	{
		imgUrl: require("../assets/images/khaneyema-risk.jpg"),
		link: "https://khaneyema.tv/6994/",
		title: "مدیریت ریسک، مفاهیم و مراحل آن",
		isSelected: false,
	},
	{
		imgUrl: require("../assets/images/khaneyema-991215-1.jpg"),
		link: "https://khaneyema.tv/7070/",
		title: "آموزش سواد مالی به کودکان",
		isSelected: false,
	},
	{
		imgUrl: require("../assets/images/khaneyema-991222-3.jpg"),
		link: "https://khaneyema.tv/7097/",
		title: "پس‌انداز و سرمایه‌گذاری زنان، نکات و راهکارها",
		isSelected: false,
	},
];

const Slider = () => {
	const[items,setItems] = useState([...itemsArray])
  const navigate = useNavigate()

  return (
    <div class="options">
      {items.map((item,i) => {
        return (
          <div
            class={item.isSelected ? "option active" : "option"}
            style={{ backgroundImage: `url(${item.imgUrl})` }}
						onMouseEnter={()=>{
							const newArray = [...items]
              newArray.map(event =>{
							  event.isSelected = false
							})
							newArray[i].isSelected = true
							setItems([...newArray])
						}}
          >
            <div class="shadow"></div>
            <div class="label">
              {/* <div class="icon">
                <i class="fas fa-igloo"></i>
              </div> */}
              <div class="info">
                <div  class="main"><span onClick={()=>window.open(item.link)}>{item.title}</span></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
