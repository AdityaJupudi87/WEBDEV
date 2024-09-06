public class Test
{
    public static void main(String[] args) 
    {
        TaskManager tm = new TaskManager();
        Task t1 = new Task(1,"Learn Java");
        Task t2 = new Task(2,"Learn React");
        Task t3 = new Task(3, "Learn React-Native");

        tm.add(t1);
        tm.add(t2);
        tm.add(t3);

        System.out.println("Todo List:");
        System.out.println();
        for(Task t: tm.getAll())
        {
            System.out.println(t);
        }
        System.out.println();
        System.out.println("Task with ID 3: "+tm.searchId(3));
        tm.remove(3);
        System.out.println();
        System.out.println("After removing Task with Id 3:");
        System.out.println("Task with Id 3:"+tm.searchId(3));
    }

}

/*
OUTPUT:

Todo List:

Task{id=1,name='Learn Java'}
Task{id=2,name='Learn React'}
Task{id=3,name='Learn React-Native'}

Task with ID 3: Task{id=3,name='Learn React-Native'}

After removing Task with Id 3:
Task with Id 3:null
 
 */