
export const carrotTypes = [{ kg: 5, price: 100 }, { kg: 7, price: 150 }, { kg: 3, price: 70 }]

export function getMaxValue(carrTypes,capacity){
    
    let cap = capacity - (carrTypes.map(
        ele => ele.kg).reduce(
            (acc, curVal) => acc + curVal)
        );

    console.log("Cap is: ",cap);

    

    let ppkg = carrTypes.map(
        ele => ele.price / ele.kg
    )

    let sorted = [...ppkg];
    sorted.sort(function (a, b) { return a - b });
    console.log('Sorted is', sorted);

    console.log('Average is',ppkg);
    
    //filling the rest of the bag with best average
    
    //A. ARRAY YAP, 
    let result = carrTypes.map(ele => [
        { ...ele, amount: 1 }
    ]);
    console.log("first result stage is::", result);

    //B.ICINE EN AVERAGE OLANI DOLDUR, BUNA MAX DE
    let bestKg = result[ppkg.indexOf(sorted[sorted.length - 1])][0].kg;
    console.log("Best KG", bestKg);
    let maxBest = parseInt(cap / bestKg);
    console.log("Max BEst , ",maxBest);
    let fill = cap - (maxBest * bestKg);


    result[ppkg.indexOf(sorted[sorted.length - 1])][0].amount = maxBest;


    if( fill === 0){
        console.log("Bulduk abicim");
        const totalPrice = (result.map(
            ele => ele[0].amount * ele[0].price).reduce(
                (acc, curVal) => acc + curVal)
        );
        console.log("Final Sonuc",result);
        console.log("Toplam Para",totalPrice);
    }
    else{

        // if(fill <= )
        console.log("daha yer var!!!",fill);
    }
        
    //C EGER BOSLUK VARSA KALAN YERE 2. AVERAGE OALNI DENE 

    //2. AVERAGE OLANLA KAPASITEYI DOLDUR, 1. OLANDAN DAHA PAHALIYSA BUNU MAX YAP
}


