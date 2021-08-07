import { ItemPedidoDTO } from "./item-pedido.dto";
import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";

export interface PedidoDTO {
  cliente: RefDTO;
  deliveryAddress: RefDTO;
  payment: PaymentDTO;
  itens: ItemPedidoDTO[];
}
