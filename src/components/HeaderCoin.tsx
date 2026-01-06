type HeaderCoinProps = {
    size?: number
    className?: string
}

const HeaderCoin = ({ size = 24, className = "" }: HeaderCoinProps) => {
    return (
        <img
            src="/assets/icon/header_coin.png"
            alt="Coin"
            style={{ width: size, height: size }}
            className={`group-hover:animate-pulse ${className}`}
        />
    )
}

export default HeaderCoin
