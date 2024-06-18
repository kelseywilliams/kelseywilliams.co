
function Header(){
    let logo = "KWS>_";
    return (
        <div>
            <h1 className="top-logo">{logo}</h1>
            <form action={search}>
                <input name="query"/>
            </form>
        </div>
    );
}