const s = process.argv;
const crypto = require('crypto');
const readline = require('readline-sync')
let h=[], kl, m=1, a=[], k=0, g=[], pmove, choices, cho
//Проверка введённых данных на верность
if (s.length%2===0) //2 проверки на верность условия.
{
    console.log("False, you need to enter odd arguments")
    console.log("Example: Rock Paper Scissors Lizard Spock")
}
if (s.length===3)
{
    console.log("Error, you need to enter more arguments.")
    console.log("Example: Rock Paper Scissors Lizard Spock")
}
for (let i=2; i<s.length; i++)
{
    for (let b=2; b<s.length; b++)
    {
        if (s[i]===s[b]&& i!==b)
        {
            k=1
        }
    }
}
if (k===1)
{
    console.log("Error, you need to enter different arguments")
    console.log("Example: Rock Paper Scissors Lizard Spock")
}
class HM
{
    pc()
    {
        g.shift()
        let key = crypto.randomBytes(20).toString('hex');
        //console.log("Hmac key: ",key) //Вывод ключа
        let pc = g[Math.floor(Math.random()*g.length)];
        let algorithm = 'sha1';   //consider using sha256
        let hash, hmac;
        hmac = crypto.createHmac(algorithm, key);
        hmac.update(pc);
        hash = hmac.digest('hex');
        console.log("HMAC:", hash);
        pmove = g.indexOf(pc)+1
        kl = key;
    }
}
class tbl
{                 //Создаёт таблицу
    gen()
    {
        //Запись наших данных в новый массив
        for (let i=2; i<s.length; i++)
        {
            h[m]=s[i]
            m++
        }
        g=h
        //Определение выигрышных комбинаций
        let count = ~~((h.length-1)/2)
        let win = [], loose = []
        m=h.length-1
        for (let i=0; i<=count-1; i++)
        {
            m-=1
            win[i]=m
        }
        for (let i=0; i<=count-1; i++)
        {
            m-=1
            loose[i]=m
        }
        //Создание таблицы выигрыша, проигрыша
        for (let i=0; i<h.length; i++)
        {
            a[i] = [];
            for (let j=0; j<h.length; j++)
            {
                let now = i-j
                if (now<0)
                {
                    now+=h.length-1
                }
                if (i===0&&j===0)
                {
                    a[i][j] = "You|Pc";
                }
                else if (i===0&&j!==0)
                {
                    a[i][j]=h[j];
                }

                else if (i!==0&&j===0)
                {
                    a[i][j]=h[i];
                }
                else if(i===j&&i!==0)
                {
                    a[i][j]="Draw"
                }
                else if(win.includes(now))
                {
                    a[i][j]="Win"
                }
                else if(loose.includes(now))
                {
                    a[i][j]="Loose"
                }
            }
        }
    }
}
class menu
{
    menu()
    {
        console.log("Available Moves:")
        for (let i=0; i<h.length; i++)
        {
            console.log(i+1, "-", h[i])
        }
        console.log("0 - exit\n? - help")
    }

}
class choice
{
    choice()
    {
        cho = readline.question("Enter your move: ")
        if (0<cho<=h.length && cho!=='?')
        {
            console.log("Your Move:", a[cho][0])
        }

    }
}
if (s.length%2!==0&&s.length>3&&k!==1)
{
    let genTable = new tbl()
    genTable.gen()
    let conley = new HM()
    conley.pc()
    let mn = new menu()
    mn.menu()
    let ch = new choice()
    ch.choice()
    if(cho!==0)
    {
        while (true)
        {
            if (cho === '?')
            {
                console.table(a)
                break
            }
            else if (cho <= 0)
            {
                break
            }
            else if (cho>0 && cho<=h.length)
            {
                console.log("Computer Move:", a[pmove][0])
                console.log(a[cho][pmove])
                console.log("HMAC key:", kl)
                break
            }
        }
    }
}