
import './style.css'
import { useState, useEffect } from 'react'
const MemoryGame = () => {
    const [card, setCard] = useState(GenerateGrid())
    const [lock, setLock] = useState(false)
    const [flippedCard, setFlippedCard] = useState([])
    const cardClickHandler = (item) => {
        if (card[item.id].isFlipped || lock) return
        const copyCard = [...card]
        copyCard[item.id].isFlipped = true
        setCard(copyCard)
        setFlippedCard([...flippedCard, item])
    }


    useEffect(() => {
        if (flippedCard.length === 2) {
            setLock(true)
            setTimeout(() => {
                if (card[flippedCard[0].id].number !== card[flippedCard[1].id].number) {
                    setCard((prevCard) => {
                        const copyCard = [...prevCard]
                        copyCard[flippedCard[0].id].isFlipped = false
                        copyCard[flippedCard[1].id].isFlipped = false
                        return copyCard
                    })
                }
                setLock(false)
                setFlippedCard([])

            }, 3000)
        }
    }, [flippedCard]);
    return (
        <div className="grid-container">
            <div className="grid-item">
                {card.map((item) => (
                    <div key={item.id} className="card" onClick={(e) => cardClickHandler(item)}>
                        {item.isFlipped ? item.number : '?'}
                    </div>
                ))}
            </div>
        </div>

    )
}
export default MemoryGame

const GenerateGrid = () => {
    const arr = Array.from({ length: 18 }, (_, index) => index + 1)
    const grid = [...arr, ...arr].sort(() => Math.random() - 0.5)
    const card = grid.map((item, index) => {
        return {
            id: index,
            number: item,
            isFlipped: false
        }
    })
    return card
}

