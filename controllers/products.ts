import { Product } from "../utils/dbconnect.ts";

// @ desc get all products
// @ route GET /api/v1/products
export const getProducts = async ({ response }: { response: any }) => {
  const products = await Product.find({});
  response.body = { success: true, data: products };
};

// @ desc get one product
// @ route GET /api/v1/product/:id
export const getProduct = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  try {
    if (validateMongoDBId(params.id)) {
      const products = await Product.find({ _id: { $oid: params.id } });

      if (products && products.length > 0) {
        response.status = 200;
        response.body = { success: true, data: products };
      } else {
        response.status = 404;
        response.body = { success: false, msg: "no data found" };
      }
    }
  } catch (e) {
    response.status = 500;
    response.body = { success: false, msg: "Something went wrong" };
  }
};

// @ desc post new  product
// @ route POST /api/v1/products
export const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 404;
    response.body = { success: false, msg: "no body data found" };
  } else {
    const { description, name, price } = body.value;

    const id = await Product.insertOne({
      name,
      description,
      price,
    });

    response.status = 201;
    response.body = { success: true, data: id };
  }
};

// @ desc update   product
// @ route PUT /api/v1/products/:id
export const updateProduct = async (
  { request, params, response }: {
    request: any;
    params: { id: string };
    response: any;
  },
) => {
  if (request.hasBody) {
    const body = await request.body();
    const product = body.value;
    const productToUpdate = await Product.updateOne(
      { _id: { $oid: params.id } },
      { $set: product },
    );

    response.status = 201;
    response.body = { success: true, data: productToUpdate };
  } else {
    response.status = 404;
    response.body = { success: false, msg: "no body data found" };
  }
};

// @ desc delete product
// @ route DELETE /api/v1/products/:id
export const deleteProduct = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  if (validateMongoDBId(params.id)) {
    const deletedProduct = await Product.deleteOne(
      { _id: { $oid: params.id } },
    );
    response.status = 201;
    response.body = { success: true, data: deletedProduct };
  }
};

const validateMongoDBId = (id: any) => {
  const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  return checkForHexRegExp.test(id);
};
