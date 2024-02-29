import prismaClient from "../../prisma";
import { printOrderDetails } from "../../utils/printerUtils";
import { DetailOrderSerivce } from "./DetailOrderSerivce";
const detailOrderService = new DetailOrderSerivce();


interface OrderRequest{
  order_id: string;
}

class FinishOrderService{
  async execute({ order_id }: OrderRequest){

    const order = await prismaClient.order.update({
      where:{
        id: order_id
      },
      data:{
        status: true,
      }
    })

    if(order){
     const orderDetails = await detailOrderService.execute({ order_id });
     printOrderDetails(orderDetails);
    }


    return order;

  }
}

export { FinishOrderService }