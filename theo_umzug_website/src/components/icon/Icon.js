const Icon = ({path, alt, style={}}) =>{
    return(
        <img src={path} alt={alt} style={style}></img>
    );
}

export default Icon;