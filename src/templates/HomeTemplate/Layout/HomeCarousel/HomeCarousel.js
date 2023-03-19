import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
const contentStyle = {
    height: '600px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',

};

const HomeCarousel = (props) => {
    const { carouselImg } = useSelector(root => root.CarouselReducer)
    console.log(carouselImg);
    return (


        <Carousel effect="fade" style={{ height: '600px', paddingTop: '80px' }}>
            {carouselImg.map((item, index) => {
                return <div key={index}>
                    <div style={contentStyle} >
                        <img src={item.hinhAnh} className='w-full ' style={{ backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'center' }} />
                    </div>
                </div>
            })}


        </Carousel>
    )
}
export default HomeCarousel;