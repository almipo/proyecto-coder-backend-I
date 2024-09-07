import productsModel from "./models/products.model.js";


class productsDaosMongo{
    constructor(){
        this.products = productsModel;
    }

  getProducts = async (filter = {}, options = {}) => {
    return await this.products.find(filter)
      .limit(options.limit || 0)
      .skip(options.skip || 0)
      .sort(options.sort || {});
  }

getProduct = async id =>  await this.products.findById(id);  
createProducts =async newproduct=> await this.products.create(newproduct)
updateProducts = async (opts, newproduct) => await this.products.findOneAndUpdate(opts, newproduct, {new:true})
deleteProducts = async opts => await this.products.findOneAndDelete(opts)


}
export default productsDaosMongo
