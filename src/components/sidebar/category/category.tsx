import './category.css'

function Category(){
    return <>
        <h2 className="sidebar-title">Category</h2>
        <div>
            <label className='sidebar-label-container'>
                <input type="radio" name='test' />
                <span className="checkmark"></span>ALL
            </label>
            <label className='sidebar-label-container'>
                <input type="radio" name='test' />
                <span className="checkmark"></span>Shirts
            </label>
            <label className='sidebar-label-container'>
                <input type="radio" name='test' />
                <span className="checkmark"></span>Pants
            </label>
            <label className='sidebar-label-container'>
                <input type="radio" name='test' />
                <span className="checkmark"></span>T-Shirts
            </label>
            <label className='sidebar-label-container'>
                <input type="radio" name='test' />
                <span className="checkmark"></span>Shorts
            </label>
        </div>
    </>
}

export default Category;