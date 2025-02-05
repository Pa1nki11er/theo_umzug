const Icon = ({iconName,alt, style={}}) =>{
    const path = "/img/" + iconName + "-svgrepo-com.svg"; 
    console.log(path);
    return(
        <img src={path} alt={alt} style={style}></img>
    );
}

export default Icon;