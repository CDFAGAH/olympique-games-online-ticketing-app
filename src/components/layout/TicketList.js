import TicketItem from './TicketItem';
import useFetch from '../../hooks/useFetch';

export default function TicketList({ eventId }) {
  const { data, loading, error } = useFetch(`/tickets?event=${eventId}`);

  return (
    <div>
      {loading ? (
        <p>Loading tickets...</p>
      ) : error ? (
        <p>Error loading tickets</p>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          {data.map((ticket) => (
            <TicketItem key={ticket._id} {...ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
