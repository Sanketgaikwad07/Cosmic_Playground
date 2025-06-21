import java.util.Scanner;

public class TernaryMin {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Welcome to the Ternary Operator\n");
        //int first=sc.nextInt();
        System.out.print("Enter the your first number: ");
        int first = sc.nextInt();

        System.out.print("Enter the your second number: ");
        int second = sc.nextInt();
        int Minimum=first<second? first:second;
        System.out.println(Minimum+ "  your minimum number ");
    }
}
