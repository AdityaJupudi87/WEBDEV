import java.util.*;

public class TaskManager 
{
    List<Task> l  = new ArrayList<>();
    Set<Task> s = new HashSet<>();
    Map<Integer,Task> m = new HashMap<>();

    // adding the task
    public void add(Task t)
    {
        l.add(t);
        s.add(t);
        m.put(t.getId(),t);
    }

    // removing the task
    public void remove(int id)
    {
        Task t = m.get(id);
        if(t != null)
        {
            l.remove(t);
            s.remove(t);
            m.remove(id);
        }
    }

    // search by name
    public List<Task> searchName(String name)
    {
        List<Task> l1 = new ArrayList<>();
        for(Task t : l)
        {
            if(t.getName().equalsIgnoreCase(name))
            {
                l1.add(t);
            }
        }
        return l1;

    }

    // search by id
    public Task searchId(int id)
    {
        return m.get(id);
    }

    // return all tasks
    public List<Task> getAll()
    {
        return new ArrayList<>(l);
    }

    
}
