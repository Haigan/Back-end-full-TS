// printerUtils.ts
import {
  ThermalPrinter,
  PrinterTypes,
  CharacterSet,
  BreakLine,
} from 'node-thermal-printer';

async function printOrderDetails(orders: any[]) {
  let printer = new ThermalPrinter({
    type: PrinterTypes.STAR,
    interface: '//localhost/POS58',
    characterSet: CharacterSet.PC852_LATIN2,
    removeSpecialCharacters: false,
    lineCharacter: "=",
    breakLine: BreakLine.WORD,
    options: {
      timeout: 5000
    }
  });
  let total = 0; // Variável para armazenar o total
  let isConnected = await printer.isPrinterConnected();
  console.log('Is Printer Connected:', isConnected);
  printer.cut();
  printer.alignCenter();
  printer.println("Sorveteria Pimpolhos");
  printer.println("===============");
  printer.println("Detalhes do Pedido");
  printer.println("===============");

  orders.forEach((order) => {
    const { product } = order;
    const itemPrice = parseFloat(product.price); // Preço do produto
    total += itemPrice; // Adiciona o preço do produto ao total
  
    printer.println(`${product.name} - R$ ${itemPrice.toFixed(2)}`);

  });
  console.log(orders)
  printer.println(`Total do Pedido: R$ ${total.toFixed(2)}`);
  printer.println("===============");
  printer.cut();

  try {
    let execute = printer.execute();
    console.log("Print done!");
  } catch (error) {
    console.error("Print failed:", error);
  }
}

export { printOrderDetails };
