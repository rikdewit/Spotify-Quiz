export default function BuyCoffee() {
    function getDate() {
        let date = new Date().getDate();
        return date
    }

    return (
        <a href="https://www.buymeacoffee.com/rikdewit" className="BuyCoffee">
            <img src={"https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=rikdewit&button_colour=1db954&font_colour=ffffff&font_family=Lato&outline_colour=191414&coffee_colour=f0e013&" + getDate()}>
            </img>
        </a >

    )
}