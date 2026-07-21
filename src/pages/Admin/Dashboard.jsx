import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct } from "../../api/productsApi";

const Dashboard = () => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <div>Loading inventory...</div>;
  if (isError) return <div>Error loading inventory data.</div>;

  return (
    <div>
      <h2>Inventory Management Dashboard</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1.5rem",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
            <th
              style={{ padding: "0.75rem", borderBottom: "1px solid #cbd5e1" }}
            >
              Image
            </th>
            <th
              style={{ padding: "0.75rem", borderBottom: "1px solid #cbd5e1" }}
            >
              Name
            </th>
            <th
              style={{ padding: "0.75rem", borderBottom: "1px solid #cbd5e1" }}
            >
              Category
            </th>
            <th
              style={{ padding: "0.75rem", borderBottom: "1px solid #cbd5e1" }}
            >
              Price
            </th>
            <th
              style={{ padding: "0.75rem", borderBottom: "1px solid #cbd5e1" }}
            >
              Stock
            </th>
            <th
              style={{ padding: "0.75rem", borderBottom: "1px solid #cbd5e1" }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
              <td style={{ padding: "0.5rem" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "4px",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td style={{ padding: "0.75rem" }}>{product.name}</td>
              <td style={{ padding: "0.75rem" }}>{product.category}</td>
              <td style={{ padding: "0.75rem" }}>${product.price}</td>
              <td style={{ padding: "0.75rem" }}>{product.stock}</td>
              <td style={{ padding: "0.75rem" }}>
                <button
                  onClick={() => deleteMutation.mutate(product.id)}
                  disabled={deleteMutation.isPending}
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
