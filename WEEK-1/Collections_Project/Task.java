import java.util.*;

public class Task
{
    public int id;
    public String name;
    public Task(int id,String name)
    {
        this.id = id;
        this.name=name;
    }
    public int getId()
    {
        return id;
    }
    public String getName()
    {
        return name;
    }

    // as we are passing custom object Task we need to modify the original methods by oveririding

    public boolean equals(Object o) // overriding
    {
        if(this==o)
        {
            return true;
        }
        if(o==null || getClass() != o.getClass())
        {
            return false;
        }
        Task t = (Task) o;
        return (id==t.id)&&(name.equals(t.name));
    }

    public int hashCode() // overriding
    {
        return Objects.hash(id,name);

    }
    
    public String toString() // overriding
    {
        return "Task{id="+ id + ",name='"+ name + "'}";
    }

    
}
