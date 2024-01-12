import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import DeleteProductService from '../services/DeleteProductService copy';

export default class ProductController {
   public async index(req: Request, res: Response): Promise<Response> {
      const listProducts = new ListProductService();

      const products = await listProducts.execute();

      return res.json(products);
   }

   public async show(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;
      const showProduct = new ShowProductService();

      const product = await showProduct.execute(id);

      return res.json(product);
   }

   public async create(req: Request, res: Response): Promise<Response> {
      const { name, price, quantity } = req.body;

      const createProduct = new CreateProductService();

      const product = await createProduct.execute({
         name,
         price,
         quantity,
      });

      return res.status(201).json(product);
   }

   public async update(req: Request, res: Response): Promise<Response> {
      const { name, price, quantity } = req.body;
      const { id } = req.params;

      const updateProduct = new UpdateProductService();

      const product = await updateProduct.execute({
         name,
         price,
         quantity,
         id,
      });

      return res.json(product);
   }

   public async delete(req: Request, res: Response): Promise<Response> {
      const { id } = req.params;

      const deleteProduct = new DeleteProductService();

      await deleteProduct.execute(id);

      return res.status(204).json();
   }
}