package com.sahyog.backend.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.aot.generate.GeneratedMethod;
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@AttributeOverrides({
        @AttributeOverride(
                name = "line",
                column = @Column(name = "address_line")
        ),
        @AttributeOverride(
                name = "district",
                column = @Column(name = "address_district")
        ),
        @AttributeOverride(
                name = "state",
                column = @Column(name = "address_state")
        ),
        @AttributeOverride(
                name = "pincode",
                column = @Column(name = "address_pincode")
        )
})
public class Address {
    public String line;
    public String district;
    public String state;
    public String pincode;
}
