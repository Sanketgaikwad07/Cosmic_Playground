import java.util.Scanner;

class TernaryOperator {


     public static void main(String[] args) {
         Scanner sc=new Scanner(System.in);
         System.out.println("Welcome to the Ternary Operator\n");
         //int first=sc.nextInt();
         System.out.print("Enter the your first number: ");
         int first=sc.nextInt();

         System.out.print("Enter the your second number: ");
         int second=sc.nextInt();
//
//         int greaterNumber;
//         if(first>second){
//         //System.out.println(first+"is the greatest number");
//greaterNumber=first;
//
//     }else{
//         greaterNumber=second;
int greaterNumber=first>second? first:second;
             System.out.println(greaterNumber+"   is the greatest number");
     }



     }


