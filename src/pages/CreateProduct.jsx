const CreateProduct = () => {
    return (
        <section className="createPage">
            <h2 className="createPageTitle">Create new product</h2>
            <form>
                <label for="name">Name:</label>
                <input type="text" name="name" id="name" className="input" placeholder="Product name" />
                <label for="image">Image:</label>
                <input type="file" name="image" id="image" className="input" />
                <div className="newImageBox">
                    <img src="#" alt="New product image" />
                </div>
                <label for="price">Price:</label>
                <input type="text" name="price" id="price" className="input" placeholder="Product price" />
                <label for="details">Details:</label>
                <input type="text" name="details" id="details" className="input" placeholder="Product details" />
                <button className="btn">Create</button>
            </form>
        </section>
    )
}

export default CreateProduct;