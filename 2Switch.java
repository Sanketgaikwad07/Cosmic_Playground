import java.util.Scanner;

class Switch {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your days: ");
        int day = sc.nextInt();
        //oldswitch(day);
        newswitch(day);
    }

    public static void newswitch(int day){
        String dayStr=switch (day){
            case 1->"Monday";
            case 2->"Tuesday";
            case 3,78,67,57 ->"Wednesday";
            case 4 ->"Thursday";
            case 5-> "Friday";
            case 6->"Saturday";
            case 7->"Sunday";
            default -> "Invalid data";
        };

        System.out.println(dayStr);
        }

        }


//    public static void oldswitch(int day){
//        switch (day) {
//            case 1:
//                System.out.println("Monday");
//                break;
//            case 2:
//                System.out.println("Tuesday");
//                break;
//
//            case 3:
//                System.out.println("Wednesday");
//                break;
//            case 4:
//                System.out.println("Thursday");
//                break;
//            case 5:
//                System.out.println("Friday");
//                break;
//            case 6://fall through
//
//            case 7:
//                System.out.println("Sunday");
//                break;
//            // case 8 -> "Holiday";
//
//            default:
//                System.out.println("invalid data");
//                break;
//





