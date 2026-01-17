type HeaderCoinProps = {
    size?: number
    className?: string
    isAnimate?: boolean
}

const HeaderCoin = ({ size = 24, className = "", isAnimate = true }: HeaderCoinProps) => {
    return (
        <img
            src="/assets/icon/header_coin.png"
            alt="Coin"
            style={{ width: size, height: size }}
            className={`${isAnimate ? "animate-pulse" : ""} ${className}`}
        />
    )
}

export default HeaderCoin
