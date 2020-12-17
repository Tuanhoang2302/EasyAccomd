const n = -1
var result = []

function check_so_nguyen_to(so_nguyen){
    for(let i = 2; i <= Math.sqrt(so_nguyen); i++){
        if(so_nguyen % i == 0){
            return false
        }
    }
    return true
}

function check_so_sieu_nguyen_to(so_nguyen){
    var temp = so_nguyen;
    do{
        if(check_so_nguyen_to(temp)){
            temp = Math.floor(temp / 10)
            if(temp == 1){
                return false
            }
        } else{
            return false
        }
    }while(temp > 0)
    return true
}

for(var i = 2; i < n; i++){
    if(check_so_sieu_nguyen_to(i)){
        result.push(i)
    }
}
console.log(result);