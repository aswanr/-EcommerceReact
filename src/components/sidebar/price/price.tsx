import './price.css'

function Price(){
    return <>
        <div className="ml">
            <h2 className="sidebar-title price-title">Price</h2>
            <label className='sidebar-label-container'>
                <input type="radio" name='test2' />
                <span className="checkmark"></span>$0-50
            </label>
            <label className='sidebar-label-container'>
                <input type="radio" name='test2' />
                <span className="checkmark"></span>$50-100
            </label>
            <label className='sidebar-label-container'>
                <input type="radio" name='test2' />
                <span className="checkmark"></span>$100-500
            </label>
            <label className='sidebar-label-container'>
                <input type="radio" name='test2' />
                <span className="checkmark"></span>over - $1000
            </label>
        </div>
    </>
}
export default Price;